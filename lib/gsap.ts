import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Registro centralizado de plugins de GSAP.
// Importa siempre desde aquí — nunca directamente de 'gsap/ScrollTrigger' etc.
// Todos los plugins de GSAP son gratuitos desde 2025 (v3.12+).
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

export { gsap, ScrollTrigger, SplitText }
