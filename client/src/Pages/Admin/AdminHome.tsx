import React from 'react'


type proptypes = {
  username: string
}

export default function AdminHome({username}: proptypes) {
  return (
		<React.Fragment>
			Welcome {username}.
		</React.Fragment>
	);
}
