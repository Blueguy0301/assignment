import { useEffect, useMemo, useState, useCallback, memo } from "react"
import Card from "./components/Card"
import { Dropdown } from "./components/Droprown"
import NavBar from "./components/NavBar"
import {
	classNames,
	getCountries,
	sortAsc,
	sortContinentAsc,
	sortContinentDesc,
	sortDesc,
} from "./helpers"
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
	const [filter, setFilter] = useState<regions>("none")
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
						<Menu.Item>
							{({ active }) => (
								<button
									type="button"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block w-full px-4 py-2 text-sm",
										filter === region ? "bg-blue-10" : ""
									)}
									onClick={() => setFilter(region)}
								>
									{region}
								</button>
							)}
						</Menu.Item>
					)
				})}
			</>
		)
	}
	const shownCountries = useMemo(() => {
		if (search !== "")
			return countries.filter((a) => {
				const words = a.name.toLowerCase().split(" ")
				return words.some((word) => word.startsWith(search.toLowerCase()))
			}) //word search
		if (sort === "Country (Asc.)") return sortAsc(countries)
		if (sort === "Country (Desc.)") return sortDesc(countries) // temporary
		if (sort === "Area (Asc.)") return countries // temporary
		if (sort === "Area (Desc.)") return countries // temporary
		if (sort === "Continent (Asc.)") return sortContinentAsc(countries) // temporary
		if (sort === "Continent (Desc.)") return sortContinentDesc(countries) // temporary
		else return countries
	}, [countries, sort, search])

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
									"block w-full px-4 py-2 text-sm",
									filter === "Lithuania" ? "bg-blue-10" : ""
								)}
								onClick={() => setFilter("Lithuania")}
							>
								Smaller than Lithuania
							</button>
						)}
					</Menu.Item>
					<FilterDropdown />
				</Dropdown>
				<div className="search ml-auto mr-5 h-full">
					<input
						type="search"
						name="search"
						id="search"
						className="rounded-md border border-black p-2"
						placeholder="Search"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
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
