import { useEffect, useMemo, useState, useCallback } from "react"
import Card from "./components/Card"
import NavBar from "./components/NavBar"
import { getCountries } from "./helpers"
import { countries } from "./types"
function App() {
	useEffect(() => {
		asyncCountries()
	}, [])
	const [countries, setCountries] = useState<countries>([])
	const asyncCountries = async () => setCountries(await getCountries())
	return (
		<div className="App min-h-screen">
			<NavBar />
			<div className="flex w-full flex-row flex-wrap items-center justify-center gap-3 p-2">
				<button type="button" className="button">
					Sort by
				</button>
				<button className="button">filter</button>
				<div className="search ml-auto mr-5 h-full">
					<input
						type="search"
						name="search"
						id="search"
						className="rounded-md border border-black p-2"
						placeholder="Search"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-4 p-2">
				{countries.map((d, i) => {
					return <Card key={i} data={d} />
				})}
			</div>
		</div>
	)
}

export default App
