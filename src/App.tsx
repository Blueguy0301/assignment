import { useEffect, useMemo, useState, useCallback, memo } from "react"
import Card from "./components/Card"
import { Dropdown } from "./components/Droprown"
import NavBar from "./components/NavBar"
import { classNames, getCountries } from "./helpers"
import type { countries, sortType } from "./types"
import { regions, sorts } from "./types"
import { Menu } from "@headlessui/react"
function App() {
	useEffect(() => {
		setLoading(true)
		asyncCountries()
	}, [])
	const [loading, setLoading] = useState(false)
	const [countries, setCountries] = useState<countries>([])
	const [search, setSearch] = useState("")
	const [continent, setContinent] = useState<string[]>([])
	const [filter, setFilter] = useState<regions>()
	const [sort, setSort] = useState<sortType>()
	const asyncCountries = async () => {
		setCountries(await getCountries())
		setLoading(false)
	}
	const SortDroprown = () => {
		return (
			<>
				{sorts.map((method, i) => {
					console.log("object")
					return (
						<Menu.Item key={method}>
							{({ active }) => (
								<button
									type="button"
									onClick={() => setSort(method)}
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										(i === 0 && sort === undefined) || sort === method
											? "bg-blue-10"
											: "",
										"block w-full px-4 py-2 text-left text-sm"
									)}
								>
									{method}
								</button>
							)}
						</Menu.Item>
					)
				})}
			</>
		)
	}
	const FilterDropdown = () => {
		return (
			<>
				{regions.map((region) => {
					console.log("object")
					return (
						<button
							key={region}
							onClick={() => setFilter(region)}
							className={classNames(
								filter === region ? "bg-blue-10" : "",
								"block w-full px-4 py-2 text-sm"
							)}
						>
							{region}
						</button>
					)
				})}
			</>
		)
	}
	const shownCountries = useMemo(() => {
		console.log("ran")
		if (search !== "") return countries //temp
		if (sort === "Country (Asc.)") return countries // temporary
		if (sort === "Country (Desc.)") return countries // temporary
		if (sort === "Area (Asc.)") return countries // temporary
		if (sort === "Area (Desc.)") return countries // temporary
		if (sort === "Continent (Asc.)") return countries // temporary
		if (sort === "Continent (Desc.)") return countries // temporary
		else return countries
	}, [countries, sort])

	return (
		<div className="App min-h-screen scroll-smooth">
			<NavBar />
			{loading && (
				<div className="fixed z-50 flex h-screen w-full items-center justify-center bg-black/75">
					<div className="lds-roller ">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
			<div className="flex w-full flex-row flex-wrap items-center justify-center gap-3 p-2">
				<Dropdown buttonName="Sort By">
					<SortDroprown />
				</Dropdown>
				<Dropdown buttonName="Fitler">
					<Menu.Item>
						{({ active }) => (
							<button
								type="button"
								className={classNames(
									active ? "bg-gray-100 text-gray-900" : "text-gray-700",
									"block w-full px-4 py-2 text-sm"
								)}
								onClick={() => setFilter("Lithuania")}
							>
								Smaller than Lithuania
							</button>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => {
							return (
								<div
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block w-full px-4 py-2 text-sm"
									)}
								>
									<span>By Continent</span>
									<FilterDropdown />
								</div>
							)
						}}
					</Menu.Item>
				</Dropdown>
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
				{shownCountries.map((d, i) => {
					return <Card key={i} data={d} />
				})}
			</div>
		</div>
	)
}

export default App
