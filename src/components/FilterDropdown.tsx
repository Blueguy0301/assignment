import { Menu } from "@headlessui/react"
import { Dispatch, SetStateAction } from "react"
import { classNames } from "../helpers"
import { regions } from "../types"
type props = {
	filter: regions
	setFilter: Dispatch<SetStateAction<regions>>
}
const FilterDropdown = ({ setFilter, filter }: props) => {
	return (
		<>
			{regions.map((region) => {
				return (
					<Menu.Item key={region}>
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
export default FilterDropdown
