"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const navItems = ["Work", "About", "Contact"];
const marqueeItems = ["Product Designer", "Interaction Designer", "UX Strategy", "Design Systems", "Visual Designer"];
const tools = [
  ["Illustrator", "/assets/tools/illustrator.png"],
  ["Photoshop", "/assets/tools/photoshop.png"],
  ["Adobe XD", "/assets/tools/xd.png"],
  ["Figma", "/assets/tools/figma.png"],
  ["Premiere Pro", "/assets/tools/premiere.png"],
  ["InDesign", "/assets/tools/indesign.png"],
  ["CorelDRAW", "/assets/tools/coreldraw.png"]
];

const projects = [
  {
    number: "01",
    title: "Cloud Lab",
    description: "Product landing page and conversion-focused digital experience.",
    tag: "NEW",
    visual: "project-visual-one"
  },
  {
    number: "02",
    title: "Datalyze",
    description: "AI data platform landing page with clear product storytelling.",
    tag: "",
    visual: "project-visual-two"
  },
  {
    number: "03",
    title: "MachineHack LMS",
    description: "Learning management dashboard for students and enterprise users.",
    tag: "NEW",
    visual: "project-visual-three"
  }
];

const editorialEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.72, ease: editorialEase }
};

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-50 border-b border-line/95 bg-paper/92 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-10">
          <a href="#" className="flex items-center gap-3 text-[14px] font-black tracking-[-0.01em]">
            <span className="h-5 w-5 bg-orange" aria-hidden="true" />
            <span>Raghu – UI/UX Designer</span>
          </a>

          <nav className="hidden items-center gap-12 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item}
                href={item === "Work" ? "#work" : `#${item.toLowerCase()}`}
                className="text-[10px] font-black uppercase tracking-[0.52em] text-ink/70 transition hover:text-orange"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="bg-orange px-5 py-4 text-[11px] font-black uppercase tracking-[0.08em] text-white transition hover:bg-ink sm:px-8"
          >
            View Resume
          </a>
        </div>
      </header>

      <section className="grid-surface border-b border-line">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[0.92fr_1.48fr] lg:px-10 lg:py-14 xl:py-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -34 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: editorialEase }}
            className="portrait-frame mx-auto aspect-[4/5.12] w-full max-w-[365px] sm:max-w-[410px] lg:mx-0"
            aria-label="Editorial portrait illustration of Raghu"
          >
            <img
              src="/assets/profile-photo.png"
              alt="Raghu"
              className="portrait-photo"
            />
          </motion.div>

          <div className="grid gap-10 lg:min-h-[560px] lg:content-between lg:pl-[8vw] xl:min-h-[610px]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: editorialEase }}
              className="max-w-[620px]"
            >
              <p className="mb-8 text-[12px] font-black uppercase tracking-[0.42em] text-orange">
                Product Design · UX Strategy · Digital Experiences
              </p>
              <p className="text-[18px] font-black leading-[1.42] tracking-[-0.035em] text-ink sm:text-[20px] lg:text-[21px]">
                <span className="text-orange">I’m Raghu,</span> a Lead UX Designer with 14+ years of experience
                transforming complex ideas into intuitive digital experiences.
              </p>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: editorialEase }}
              className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_120px] lg:items-end"
            >
              <div>
                <h1 className="text-[clamp(5rem,13vw,9.9rem)] font-black leading-[0.72] tracking-[-0.055em]">
                  <span className="block text-[0.28em] leading-none tracking-[-0.035em] text-muted">I’m</span>
                  <span className="name-bold">Raghu</span>
                </h1>
                <p className="mt-5 text-[16px] font-black tracking-[-0.035em] sm:text-[18px]">
                  Designing clarity for products that scale.
                </p>
                <div className="mt-7 space-y-1 text-[12px] font-black uppercase leading-relaxed tracking-[-0.02em] text-muted">
                  <p>14+ Years of Design Practice</p>
                  <p>Bangalore / Remote</p>
                </div>
              </div>

              <a
                href="#work"
                className="group relative hidden h-[116px] w-[116px] place-items-center rounded-full lg:grid"
                aria-label="Explore works"
              >
                <span className="absolute inset-0 animate-spin rounded-full border border-transparent [animation-duration:13s]">
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.28em] text-muted">
                    Explore Works
                  </span>
                </span>
                <span className="grid h-16 w-16 place-items-center text-orange transition group-hover:translate-y-1 group-hover:text-ink">
                  <ArrowDown strokeWidth={3} size={48} />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-line bg-paper py-10 sm:py-12" aria-label="Design tools">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-line" />
        <div className="tools-guide absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2" />
        <div className="relative mx-auto flex max-w-[760px] flex-wrap items-center justify-center gap-3 bg-paper px-5 sm:gap-5">
          {tools.map(([name, src]) => (
            <img key={name} src={src} alt={name} title={name} className="h-11 w-11 object-contain sm:h-14 sm:w-14" />
          ))}
          <span className="absolute -top-5 left-1/2 translate-x-3 bg-orange px-3 py-1 text-[9px] uppercase text-white sm:text-[10px]">
            Tools I am expert with
          </span>
        </div>
      </section>

      <section className="overflow-hidden border-b border-line bg-paper py-6" aria-label="Design capabilities">
        <div className="marquee-track flex w-max items-center gap-7 whitespace-nowrap will-change-transform">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-7">
              <span className="text-[34px] font-black leading-none tracking-[-0.055em] sm:text-[40px] lg:text-[46px]">
                {item}
              </span>
              <span className="h-3 w-3 rotate-45 bg-orange" aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="grid-surface border-b border-line px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1.45fr_1fr]">
            <motion.div {...fadeUp}>
              <p className="mb-3 text-[12px] font-black uppercase tracking-[0.42em] text-orange">Selected Work</p>
              <h2 className="text-[clamp(5rem,13vw,10rem)] font-black leading-[0.78] tracking-[-0.075em]">
                Projects
              </h2>
            </motion.div>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.72, delay: 0.12, ease: editorialEase }}
              className="max-w-[440px] text-[18px] font-extrabold leading-[1.35] tracking-[-0.035em] text-muted lg:mb-5 lg:ml-auto"
            >
              Editorial project stories across product, brand, mobile, interaction, and visual systems.
            </motion.p>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={reduceMotion ? false : { opacity: 0, y: 38 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.72, delay: index * 0.08, ease: editorialEase }}
                className="group overflow-hidden rounded-[26px] bg-[#EAE7DF] shadow-soft"
              >
                <div className={`relative min-h-[360px] overflow-hidden sm:min-h-[460px] lg:min-h-[520px] ${project.visual}`}>
                  <div className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-[10px] bg-white text-[11px] font-black shadow-soft">
                    {project.number}
                  </div>
                  {project.tag ? (
                    <div className="absolute right-5 top-5 rounded-full bg-orange px-4 py-2 text-[10px] font-black uppercase tracking-[0.08em] text-white">
                      {project.tag}
                    </div>
                  ) : null}
                </div>
                <div className="border-t border-ink/10 bg-paper p-6">
                  <h3 className="text-[26px] font-black tracking-[-0.055em]">{project.title}</h3>
                  <p className="mt-2 text-[15px] font-bold leading-[1.45] tracking-[-0.02em] text-muted">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px] border-b border-line pb-16">
          <p className="max-w-[850px] text-[clamp(2.1rem,5vw,5.4rem)] font-black leading-[0.96] tracking-[-0.065em]">
            Lead design practice for complex products, sharper UX systems, and launch-ready digital experiences.
          </p>
        </div>
      </section>

      <footer id="contact" className="px-6 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 border-t border-line pt-8 text-[12px] font-black uppercase tracking-[0.22em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Raghu – UI/UX Designer</p>
          <a href="mailto:hello@raghudesign.com" className="text-ink transition hover:text-orange">
            hello@raghudesign.com
          </a>
        </div>
      </footer>
    </main>
  );
}
