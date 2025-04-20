import { Fragment } from "react"
import { MongoClient } from "mongodb"
import Head from "next/head"
import { MeetupList } from "@/components/Meetups"

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Nextjs Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetup" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://john:see1L$oc$@cluster0.vkrrcow.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
  )
  const db = client.db()
  const meetupsCollection = db.collection("meetups")
  const meetups = await meetupsCollection.find().toArray()
  client.close()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  }
}

export default HomePage
