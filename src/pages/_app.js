// import "@/styles/globals.css";
// import Layout from "@/components/layout/Layout";

// export default function App({ Component, pageProps }) {
//   return (
//   <Layout>
//  <Component {...pageProps} />;
//   </Layout>
//   )
// }


import "@/styles/globals.css"
import Link from "next/link"

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Combined Layout and Navigation */}
      <header className="header">
        <div className="logo">React Meetups</div>
        <nav>
          <ul>
            <li>
              <Link href="/">All Meetups</Link>
            </li>
            <li>
              <Link href="/new-meetup">Add New Meetup</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <Component {...pageProps} />
      </main>
    </>
  )
}
