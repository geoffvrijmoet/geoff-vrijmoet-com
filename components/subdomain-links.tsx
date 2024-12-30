import { Button } from "./ui/button"

const subdomains = [
  {
    name: "Podcasts",
    url: "https://podcasts.geoffvrijmoet.com",
    description: "Explore my podcast production work"
  },
  {
    name: "Development",
    url: "https://dev.geoffvrijmoet.com",
    description: "Check out my development projects"
  }
]

export function SubdomainLinks() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Explore More</h2>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {subdomains.map((subdomain) => (
            <a 
              key={subdomain.name}
              href={subdomain.url}
              className="block group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{subdomain.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{subdomain.description}</p>
              <Button variant="outline">Visit Site →</Button>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
} 