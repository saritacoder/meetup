"use client"

import { useRef } from "react"
import { useRouter } from "next/router"
import MeetupItem from "./meetups/MeetupItem"


// Card UI Component
export function Card(props) {
  return <div className="card">{props.children}</div>
}

// MeetupItem Component
// function MeetupItem(props) {
//   const router = useRouter()

//   function showDetailsHandler() {
//     router.push("/" + props.id)
//   }

//   return (
//     <li className="item">
//       <Card>
//         <div className="image">
//           <img src={props.image || "/placeholder.svg"} alt={props.title} />
//         </div>
//         <div className="content">
//           <h3>{props.title}</h3>
//           <address>{props.address}</address>
//         </div>
//         <div className="actions">
//           <button onClick={showDetailsHandler}>Show Details</button>
//         </div>
//       </Card>
//     </li>
//   )
// }

// MeetupList Component
export function MeetupList(props) {
  return (
    <ul className="list">
      {props.meetups.map((meetup) => (
        <MeetupItem key={meetup.id} id={meetup.id} image={meetup.image} title={meetup.title} address={meetup.address} />
      ))}
    </ul>
  )
}

// MeetupDetail Component
export function MeetupDetail(props) {
  return (
    <section className="detail">
      <img src={props.image || "/placeholder.svg"} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  )
}

// MeetupForm Component
export function MeetupForm(props) {
  const titleInputRef = useRef()
  const imageInputRef = useRef()
  const addressInputRef = useRef()
  const descriptionInputRef = useRef()

  function submitHandler(event) {
    event.preventDefault()

    const enteredTitle = titleInputRef.current.value
    const enteredImage = imageInputRef.current.value
    const enteredAddress = addressInputRef.current.value
    const enteredDescription = descriptionInputRef.current.value

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    }

    props.onAddMeetup(meetupData)
  }

  return (
    <Card>
      <form className="form" onSubmit={submitHandler}>
        <div className="control">
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className="control">
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className="control">
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className="control">
          <label htmlFor="description">Description</label>
          <textarea id="description" required rows="5" ref={descriptionInputRef}></textarea>
        </div>
        <div className="actions">
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  )
}
