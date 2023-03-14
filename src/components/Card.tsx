import React from "react"
import { country } from "../types"
type props = {
	data: country
}
const Card = ({ data }: props) => {
	return (
		<div className="flex items-center rounded-md bg-yellow-30 p-4">
			<div className="info">
				<h3>{data.name}</h3>
				<h4>{data.region}</h4>
			</div>
			<div className="ml-auto flex flex-col items-end">
				<span>{data.area}</span>
				{!data.independent ? <span>independent</span> : <span>Not independent</span>}
			</div>
		</div>
	)
}

export default Card
