import { shaderMaterial } from "@react-three/drei";
import { Texture, Vector2, Vector3 } from "three";

export const BlobMaskMaterial = shaderMaterial(
  {
    iTime: 0.0,
    iResolution: new Vector2(0.5, 1),
    iColor: new Vector3(0, 0, 0),
    iMouse: new Vector2(0, 0),
  },
  // vertex shader
  /*glsl*/ `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `    

    #define SCALE 3.0

    uniform vec2 iResolution;
    uniform float iTime;
    uniform vec3 iColor;
    uniform vec2 iMouse;
    varying vec2 vUv;

    vec3 random_perlin( vec3 p ) {
        p = vec3(
                dot(p,vec3(127.1,311.7,69.5)),
                dot(p,vec3(269.5,183.3,132.7)), 
                dot(p,vec3(247.3,108.5,96.5)) 
                );
        return -1.0 + 2.0*fract(sin(p)*43758.5453123);
    }
    
    float noise_perlin (vec3 p) {
        vec3 i = floor(p);
        vec3 s = fract(p);
    
        float a = dot(random_perlin(i),s);
        float b = dot(random_perlin(i + vec3(1, 0, 0)),s - vec3(1, 0, 0));
        float c = dot(random_perlin(i + vec3(0, 1, 0)),s - vec3(0, 1, 0));
        float d = dot(random_perlin(i + vec3(0, 0, 1)),s - vec3(0, 0, 1));
        float e = dot(random_perlin(i + vec3(1, 1, 0)),s - vec3(1, 1, 0));
        float f = dot(random_perlin(i + vec3(1, 0, 1)),s - vec3(1, 0, 1));
        float g = dot(random_perlin(i + vec3(0, 1, 1)),s - vec3(0, 1, 1));
        float h = dot(random_perlin(i + vec3(1, 1, 1)),s - vec3(1, 1, 1));
    
        // Smooth Interpolation
        vec3 u = smoothstep(0.,1.,s);
    
        return mix(mix(mix( a, b, u.x),
                    mix( c, e, u.x), u.y),
                mix(mix( d, f, u.x),
                    mix( g, h, u.x), u.y), u.z);
    }
    
    float Spotlight(vec3 lightPos, vec3 fragPos, vec3 spotDir, float cone, float decay)
    {   
        vec3 lDir = normalize(lightPos - fragPos);
        float theta = dot(-lDir,spotDir);
        float dist = abs(length(lightPos - fragPos));
        float att = (1.0/(dist*dist));
        return clamp((theta-cone)/(decay),0.0,1.0)*clamp(att,0.1,1.0);
    }
    
    float EaseOutQuad(float x)
    {
      return 1.0 - (1.0-x) * (1.0 -x );
    }

    vec3 colorCycle(float time, float variant) {
      float cycleDuration = 20.0; // Duration of each color in seconds
      float t = mod(time, cycleDuration) / cycleDuration;
    
      vec3 color1 = vec3(0.506 + variant, 0.635, 0.224); // #81A339
      vec3 color2 = vec3(0.184 + variant, 0.369 + variant, 0.404); // #2F5E67
      vec3 color3 = vec3(0.227 + variant, 0.078 + variant, 0.424); // #3A146C
      vec3 color4 = vec3(0.8 + variant, 0.01 + variant, 0.424); // red
    
      if (t < 0.25) {
        return mix(color1, color2, t * 4.0);
      } else if (t < 0.5) {
        return mix(color2, color3, (t - 0.25) * 4.0);
      } else if (t < 0.75) {
        return mix(color3, color4, (t - 0.5) * 4.0);
      } else {
        return mix(color4, color1, (t - 0.75) * 4.0);
      }
    }
  
    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord.xy / iResolution.xy;
        float c = noise_perlin(vec3(SCALE * uv, iTime * 0.45))+0.3;
    
        // Define the heatmap colors
        vec3 color1 = vec3(0.0, 0.0, 0.0);  
        vec3 color2 = colorCycle(iTime, 0.0);
        vec3 color3 = colorCycle(iTime, 0.2);
        vec3 color4 = colorCycle(iTime, 0.4);  
    

        vec3 heatmapColor;
        if (c < 0.25)
            heatmapColor = mix(color1, color2, c * 4.0);
        else if (c < 0.5)
            heatmapColor = mix(color2, color3, (c - 0.25) * 4.0);
        else if (c < 0.75)
            heatmapColor = mix(color3, color4, (c - 0.5) * 4.0);
        else
            heatmapColor = color4;
    
        //spotlight code

        vec2 uv2 = fragCoord/iResolution.xy;
        uv2 = 2.0 * uv2 - 1.0;
        uv2.x *= iResolution.x/iResolution.y;
        vec2 ms = 2.0*(iMouse.xy/iResolution.xy)-1.0;
        vec3 lDir = normalize(vec3(EaseOutQuad(ms.x),EaseOutQuad(ms.y),1.0));
        float phong = dot(lDir,vec3(0,0,1.0));
      
        float spotlight = Spotlight(
            vec3(EaseOutQuad(ms.x * 0.53), -EaseOutQuad(ms.y * 0.53), -0.4),
            vec3(uv2.x / 1.5, uv2.y / 1.5, 0.2),
            lDir,
            0.7,
            0.4
        );
    
        // Blend the spotlight effect with the heatmap color using multiply blend mode
        vec3 finalColor = heatmapColor * spotlight * phong;
    
        finalColor = clamp(finalColor * 2.9, 0.0, 1.);
    
        fragColor = vec4(finalColor, 1.0);
    }

    void main() {
        mainImage(gl_FragColor, vUv * iResolution.xy);
    }

  `,
);
