import { Fragment } from "react"
import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head"
import { MeetupDetail } from "@/components/Meetups"

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  )
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://john:see1L$oc$@cluster0.vkrrcow.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
  )
  const db = client.db()
  const meetupsCollection = db.collection("meetups")
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()
  client.close()

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId

  const client = await MongoClient.connect(
    "mongodb+srv://john:see1L$oc$@cluster0.vkrrcow.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
  )
  const db = client.db()
  const meetupsCollection = db.collection("meetups")
  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) })
  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  }
}

export default MeetupDetails
