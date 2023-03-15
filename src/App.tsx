import { useEffect, useMemo, useState } from "react"
import Card from "./components/Card"
import { Dropdown } from "./components/Droprown"
import NavBar from "./components/NavBar"
import {
	classNames,
	filterCountries,
	getCountries,
	sortArea,
	sortAsc,
	sortContinent,
	wordsearch,
} from "./helpers"
import { countries, countriesPerPage, sortType } from "./types"
import { regions } from "./types"
import { Menu } from "@headlessui/react"
import Pagination from "./components/Pagination"
import SortDropdown from "./components/SortDropdown"
import FilterDropdown from "./components/FilterDropdown"
function App() {
	useEffect(() => {
		setLoading(true)
		asyncCountries()
	}, [])
	const [page, setPage] = useState(1)
	const firstPageIndex = page * countriesPerPage
	const firstCountry = firstPageIndex - countriesPerPage
	const [loading, setLoading] = useState(false)
	const [countries, setCountries] = useState<countries>([])
	const [search, setSearch] = useState("")
	const [filter, setFilter] = useState<regions>("none")
	const [sort, setSort] = useState<sortType>()
	const asyncCountries = async () => {
		setCountries(await getCountries())
		setLoading(false)
	}

	const shownCountries = useMemo(() => {
		console.log("show ran")
		if (search !== "") return wordsearch(countries, search)
		if (filter !== "none") return filterCountries(countries, filter)
		if (sort?.includes("Country"))
			return sortAsc(countries, sort.includes("Asc") ? "asc" : "desc")
		if (sort?.includes("Area"))
			return sortArea(countries, sort.includes("Asc") ? "asc" : "desc")
		if (sort?.includes("Continent"))
			return sortContinent(countries, sort.includes("Asc") ? "asc" : "desc")
		return countries
	}, [countries, sort, search, filter])
	const currentPage = shownCountries.slice(firstCountry, firstPageIndex)
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
				<Dropdown buttonName="Sort By" disabled={filter !== "none"}>
					<SortDropdown sort={sort} setSort={setSort} />
				</Dropdown>
				<Dropdown buttonName="Filter">
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
					<FilterDropdown filter={filter} setFilter={setFilter} />
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
				{currentPage.map((d, i) => {
					return <Card key={i} data={d} />
				})}
				<Pagination
					setPage={setPage}
					totalCountries={shownCountries.length}
					page={page}
				/>
			</div>
		</div>
	)
}

export default App
