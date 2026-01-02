import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { getAllPosts } from '@/lib/data-utils'

// RSS Configuration Constants
const DEFAULT_BANNER_PATH = '/static/common/default-banner-1200x630.jpg'
const DEFAULT_MIME_TYPE = 'image/jpeg'

// Helpers
const MIME_TYPES: Record<string, string> = {
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
}

function getImageMimeType(imageUrl: string): string {
  const urlWithoutQuery = imageUrl.split('?')[0]
  const extension = urlWithoutQuery.split('.').pop()?.toLowerCase() || ''
  return MIME_TYPES[extension] || DEFAULT_MIME_TYPE
}

function createImageUrl(imageSrc: string | undefined, siteUrl: string, defaultBanner: URL): string {
  return imageSrc
    ? new URL(imageSrc, siteUrl).toString()
    : defaultBanner.toString()
}

function createRssItem(post: CollectionEntry<'blog'>, siteUrl: string, defaultBanner: URL) {
  const imageUrl = createImageUrl(post.data.image?.src, siteUrl, defaultBanner)
  const imageType = getImageMimeType(imageUrl)

  return {
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.date,
    link: `/blog/${post.id}/`,
    content: `<img src="${imageUrl}" alt="${post.data.title}" />`,
    customData: `<enclosure url="${imageUrl}" type="${imageType}" />`,
  }
}

// Main
export async function GET(context: APIContext) {
  try {
    const posts = await getAllPosts()
    const siteUrl = context.url.origin
    const defaultBanner = new URL(DEFAULT_BANNER_PATH, siteUrl)

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: siteUrl,
      items: posts.map((post) => createRssItem(post, siteUrl, defaultBanner)),
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
