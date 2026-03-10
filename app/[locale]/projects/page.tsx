import Image from "next/image";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "Projets muraux, in situ et plafond peint — interventions artistiques.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-[4.5rem] md:pt-24 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12 md:mb-16">
          <h1 className="font-serif text-display-sm text-ink">Projects</h1>
          <p className="mt-4 text-inkMuted text-sm md:text-base leading-relaxed">
            Projets in situ, peintures murales et œuvres conçues pour un lieu donné.
          </p>
        </header>

        <div className="space-y-16 md:space-y-20">
          {projects.map((project) => (
            <article key={project.slug} className="border-t border-black/10 pt-8">
              <h2 className="font-serif text-xl md:text-2xl text-ink">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-inkMuted">
                {project.year}
                {project.location && ` · ${project.location}`}
              </p>
              <p className="mt-4 text-inkMuted text-sm md:text-base leading-relaxed">
                {project.description}
              </p>
              {project.images?.length > 0 && (
                <div className="mt-8 space-y-6">
                  {project.images.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden bg-black/5"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
