// Raw WebGL renderer for the churn: one fullscreen triangle, one fragment shader.
// The scoop is lit like a sphere seen from above; inside it, a domain-warped marble
// lays ribbons and flecks. Every visual input is a uniform owned by the driver.

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uC;        // scoop centre, 0..1 of the canvas
uniform float uR;       // scoop radius, fraction of the short side
uniform float uTwist;   // how hard the marble is churned toward the centre
uniform float uChurn;   // accumulated rotation from scrolling
uniform float uSeed;
uniform float uRibbon;  // ribbon width
uniform vec3 uBase;
uniform vec3 uRib;
uniform vec3 uFleck;
uniform vec3 uBg;
uniform vec2 uMouse;

float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  mat2 r=mat2(.8,.6,-.6,.8);
  for(int i=0;i<4;i++){v+=a*noise(p);p=r*p*2.02;a*=.5;}
  return v;
}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}

void main(){
  float k=min(uRes.x,uRes.y);
  vec2 p=(gl_FragCoord.xy-uC*uRes)/k;
  float d=length(p);
  float t=uTime;

  // craggy scooped edge
  vec2 dir=p/max(d,1e-4);
  float rr=uR*(1.+.05*(noise(dir*2.3+uSeed+t*.05)-.5)+.012*sin(atan(p.y,p.x)*9.+uSeed));
  float aa=2./k;
  float mask=smoothstep(rr+aa,rr-aa,d);

  // background: emerald, a soft pool of light behind the scoop and its shadow
  vec2 sp=p-vec2(.035,-.06)*uR*2.;
  float shadow=smoothstep(rr*1.35,rr*.7,length(sp));
  vec2 uv=gl_FragCoord.xy/uRes;
  vec3 bg=uBg*(1.08-.35*length(uv-.5));
  bg+=uBg*.18*smoothstep(rr*2.2,0.,d);
  bg*=1.-.45*shadow;

  vec3 col=bg;
  if(mask>0.){
    float s=clamp(d/rr,0.,1.);
    vec2 q=rot(uTwist*(1.-s)*(1.-s)*3.+uChurn)*(p/rr);
    q*=1.7;
    vec2 w=vec2(fbm(q*1.2+uSeed+t*.035),fbm(q*1.2+vec2(5.2,1.3)-t*.03));
    float m=fbm(q+1.9*w);
    float band=abs(sin(m*10.+q.x*1.4));
    float rib=smoothstep(uRibbon,uRibbon*.35,band);
    col=mix(uBase,uRib,rib);
    // a softer second ribbon gives depth to the marble
    float band2=abs(sin(m*6.-q.y*2.+1.7));
    col=mix(col,mix(uBase,uRib,.5),smoothstep(.12,.0,band2)*.55);
    float f=noise(q*34.+uSeed*3.);
    col=mix(col,uFleck,smoothstep(.9,.93,f)*.9);
    // creamy surface grain
    float g=noise(q*14.+w*3.);
    col*=.9+.12*g;

    // sphere lighting, nudged by the pointer
    float z=sqrt(max(0.,1.-s*s));
    vec3 n=normalize(vec3(p/rr*.95+(vec2(g,noise(q*14.+7.))-.5)*.18,z+.05));
    vec3 L=normalize(vec3(-.45+uMouse.x*.5,.55+uMouse.y*.4,.75));
    float diff=.62+.42*max(dot(n,L),0.);
    float spec=pow(max(dot(reflect(-L,n),vec3(0,0,1)),0.),22.)*.1;
    col=col*diff+spec;
    col*=mix(.72,1.,smoothstep(1.,.78,s));
  }
  gl_FragColor=vec4(mix(bg,col,mask),1.);
}`;

export type ChurnUniforms = {
  c: [number, number];
  r: number;
  twist: number;
  churn: number;
  seed: number;
  ribbon: number;
  base: [number, number, number];
  rib: [number, number, number];
  fleck: [number, number, number];
  bg: [number, number, number];
  mouse: [number, number];
  time: number;
};

export type Churn = {
  resize: (w: number, h: number, scale: number) => void;
  render: (u: ChurnUniforms) => void;
  destroy: () => void;
};

export function createChurn(canvas: HTMLCanvasElement): Churn | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'high-performance' });
  if (!gl) return null;
  const hi = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
  const frag = hi && hi.precision > 0 ? FRAG : FRAG.replace('precision highp float;', 'precision mediump float;');

  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
    return s;
  };
  let prog: WebGLProgram;
  try {
    prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  } catch {
    return null;
  }
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = {
    res: U('uRes'), time: U('uTime'), c: U('uC'), r: U('uR'), twist: U('uTwist'), churn: U('uChurn'),
    seed: U('uSeed'), ribbon: U('uRibbon'), base: U('uBase'), rib: U('uRib'), fleck: U('uFleck'), bg: U('uBg'), mouse: U('uMouse'),
  };

  return {
    resize(w, h, scale) {
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.res, canvas.width, canvas.height);
    },
    render(v) {
      gl.uniform1f(u.time, v.time);
      gl.uniform2f(u.c, v.c[0], v.c[1]);
      gl.uniform1f(u.r, v.r);
      gl.uniform1f(u.twist, v.twist);
      gl.uniform1f(u.churn, v.churn);
      gl.uniform1f(u.seed, v.seed);
      gl.uniform1f(u.ribbon, v.ribbon);
      gl.uniform3fv(u.base, v.base);
      gl.uniform3fv(u.rib, v.rib);
      gl.uniform3fv(u.fleck, v.fleck);
      gl.uniform3fv(u.bg, v.bg);
      gl.uniform2f(u.mouse, v.mouse[0], v.mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
