import type { Dispatch, SetStateAction } from "react"
import { countriesPerPage } from "../types"
type props = {
	setPage: Dispatch<SetStateAction<number>>
	totalCountries: number
	page: number
}
const Pagination = ({ setPage, totalCountries, page }: props) => {
	return (
		<div className="flex flex-row flex-wrap items-center justify-center gap-4">
			<button
				type="button"
				className="rounded-md bg-yellow-30  px-3 py-2 disabled:opacity-50"
				onClick={() =>
					setPage((prev) => {
						if (prev > 1) {
							window.scrollTo({
								behavior: "smooth",
								top: 0,
							})
							return prev - 1
						} else return 1
					})
				}
				disabled={page === 1}
			>
				Previous
			</button>
			<button
				type="button"
				className="rounded-md bg-yellow-30  px-3 py-2 disabled:opacity-50"
				onClick={() => {
					setPage((prev) => {
						if (Math.ceil(totalCountries / countriesPerPage) === prev) return prev
						else {
							window.scrollTo({
								behavior: "smooth",
								top: 0,
							})
							return prev + 1
						}
					})
				}}
				disabled={Math.ceil(totalCountries / countriesPerPage) === page}
			>
				Next
			</button>
		</div>
	)
}

export default Pagination
