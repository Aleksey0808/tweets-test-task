import React, { useState, useEffect } from 'react'
import { CardTweet } from '../card/CardTweet'
import css from './CardList.module.css'
import { CiCircleMore } from 'react-icons/ci'
import fetchUsers from '../../api/api'

export const CardList = ({ filter }) => {
  const [next, setNext] = useState(3)
  const [sortedUsers, setSortedUsers] = useState([])
  const [users, setUsers] = useState([])

  const handleMoreCards = () => {
    setNext(next + 3)
  }
  useEffect(() => {
    fetchUsers().then((data) => setUsers(data))
  }, [])

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      switch (filter) {
        case 'follow':
          return !JSON.parse(localStorage.getItem(`${user.id}-isFollowing`))
        case 'followings':
          return JSON.parse(localStorage.getItem(`${user.id}-isFollowing`))
        case 'all':
          return true
        default:
          return null
      }
    })

    setSortedUsers(filteredUsers)
  }, [filter, users])

  return (
    <>
      <div className={css.list}>
        {sortedUsers
          .slice(0, next)
          .map(({ id, user, tweets, followers, avatar }) => (
            <CardTweet
              key={id}
              user={user}
              tweets={tweets}
              followers={followers}
              id={id}
              avatar={avatar}
            />
          ))}
      </div>
      <div className={css.buttonBox}>
        {next < sortedUsers.length && (
          <button onClick={handleMoreCards} className={css.button}>
            Load more <CiCircleMore className={css.icon} />
          </button>
        )}
      </div>
    </>
  )
}
