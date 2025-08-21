import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { inclusions } from '../constants'
import ProductsList from '@/components/product-list'
import Hero from '@/components/Hero'
import payload from '@/lib/payload'

export default async function HomePage() {
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  return (
    <div>
      <Hero />
      <h2 className="text-3xl font-bold ms-16">Start Shopping</h2>
      <ProductsList />

      <div>
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-10 p-10">
          {inclusions.map((inclusion) => (
            <li key={inclusion.title}>
              <Link href={inclusion.href}>
                <Image
                  src={inclusion.icon}
                  alt={inclusion.title}
                  width={20}
                  height={20}
                  quality={100}
                  style={{
                    filter:
                      'invert(44%) sepia(9%) saturate(254%) hue-rotate(181deg) brightness(91%) contrast(87%)',
                  }}
                />
                <h3 className="text-lg font-semibold mt-1.5">{inclusion.title}</h3>
                <p>{inclusion.details}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

{
  /* <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div> */
}
