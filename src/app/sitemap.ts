import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'
import { caseStudies } from '@/data/case-studies'
import { services } from '@/data/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.starteck.co.uk'

  // Main pages
  const routes = [
    '',
    '/about',
    '/services',
    '/blog',
    '/case-studies',
    '/contact',
    '/demo',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic Blog pages
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic Case Study pages
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic Service pages
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes, ...caseStudyRoutes, ...serviceRoutes]
}
