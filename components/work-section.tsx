import { FilmSection } from './film-section'

interface WorkSectionProps {
  id: string
  title: string
  description: string
  type?: 'film' | 'default'
}

export function WorkSection({ id, title, description, type = 'default' }: WorkSectionProps) {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      {type === 'film' ? (
        <FilmSection />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project cards will go here - we can add these later */}
        </div>
      )}
    </section>
  )
} 