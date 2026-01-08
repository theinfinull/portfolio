import { SITE, ME } from '@/consts'

/**
 * Gets searchable content for static pages based on actual page content
 */
export async function getPageSearchData() {
  const homeContent = {
    id: 'home',
    title: 'Home',
    description: `${ME.age} year old 👨🏻‍💻 Web Developer based in 📌 Coimbatore, India. 1+ years at Zoho, scaling and modernizing 20+ year old legacy codebases. Obsessed with building cool stuff with code and some caffeine ☕. Currently working on enterprise Java backends, but I juggle multiple stacks when the problem demands it.`,
    tags: ['home', 'developer', 'portfolio', 'sedhu', 'madhav', 'zoho', 'coimbatore'],
    slug: '/',
    type: 'page' as const,
  }

  const age = new Date().getFullYear() - 2002
  const aboutContent = {
    id: 'about',
    title: 'About',
    description: `Hey! I'm Sedhu Madhav aka Infinull, ${age} year old software dev from Tamilnadu, India. Right now, I'm working as a Backend Developer at Zoho. I started out as a Computer Science graduate, curious about how things work under the hood. Somewhere along the way, that curiosity turned into a passion - and eventually, a career I genuinely enjoy. I primarily work on web projects, focusing on the backend — APIs, Logic, DBs and stuff. Every now and then, I start messing around with frontend too, crafting sites that I find cool — like this one.`,
    tags: ['about', 'sedhu', 'madhav', 'infinull', 'developer', 'backend', 'zoho', 'tamilnadu'],
    slug: '/about',
    type: 'page' as const,
  }

  return [homeContent, aboutContent]
}
