import { IProfile } from '../api/models'

const Profile = ({
  email,
  name,
}: IProfile) => {
  return (
    <div>
      <h1>
        Welcome {name}
      </h1>
      <h2>
        EMAIL: {email}
      </h2>
    </div>
  )
}

export default Profile
