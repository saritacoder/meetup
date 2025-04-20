"use client"

import { useRouter } from "next/router"
import { Fragment } from "react"
import Head from "next/head"
import { MeetupForm } from "@/components/Meetups"

const NewMeetupPage = () => {
  const router = useRouter()

  async function addMeetupHandler(meetupData) {
    const response = await fetch("/api/meetups", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    await response.json()
    router.push("/")
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your own meetups and create amazing networking opportunities" />
      </Head>
      <MeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  )
}

export default NewMeetupPage
