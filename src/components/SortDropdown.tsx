import { Menu } from "@headlessui/react"
import { Dispatch, SetStateAction } from "react"
import { classNames } from "../helpers"
import { sorts, sortType } from "../types"
type props = {
	setSort: Dispatch<SetStateAction<sortType>>
	sort: sortType
}
const SortDropdown = ({ sort, setSort }: props) => {
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
									(i === 0 && sort === undefined) || sort === method ? "bg-blue-10" : "",
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
export default SortDropdown
