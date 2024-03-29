import { useEffect, useState } from "react"
import { CharacterFilter, CharacterStatusFilter, GenderFilter, SpecieFilter, StatusFilter } from "../../../utils/filters"
import Filters from "./Filters"
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { cleanFilters, setSelectedFilters } from "../../../store/slices/filtersSlice";
import { IoMdArrowBack } from "react-icons/io";
import { initialFilterState } from "../../../utils/constants";
interface FiltersModalProps {
    openFilters: boolean;
    setOpenFilters: React.Dispatch<React.SetStateAction<boolean>>
}

export const FiltersModal = ({ openFilters, setOpenFilters }: FiltersModalProps) => {

    const dispatch = useAppDispatch()
    const selectedFilters = useAppSelector(state => state.filtersSlice.selectedFilters);

    const [localSelectedFilters, setLocalSelectedFilters] = useState(selectedFilters);

    const [validationFilters, setValidationFilters] = useState(false);

    useEffect(() => {
        setLocalSelectedFilters(selectedFilters);
    }, [selectedFilters])

    useEffect(() => {
        setValidationFilters(
            localSelectedFilters.Character != initialFilterState.Character ||
            localSelectedFilters.Specie != initialFilterState.Specie ||
            localSelectedFilters.Gender != initialFilterState.Gender ||
            localSelectedFilters.CharacterStatus != initialFilterState.CharacterStatus ||
            localSelectedFilters.Status != initialFilterState.Status
        )
    }, [localSelectedFilters])

    const applyFilters = () => {
        dispatch(setSelectedFilters({
            ...selectedFilters,
            Character: localSelectedFilters?.Character,
            Specie: localSelectedFilters?.Specie,
            Gender: localSelectedFilters?.Gender,
            CharacterStatus: localSelectedFilters?.CharacterStatus,
            Status: localSelectedFilters?.Status,
        }));

        setOpenFilters(prev => !prev);
    }

    const onCleanFilters = () => {

        dispatch(cleanFilters());
        setLocalSelectedFilters({
            ...selectedFilters,
            ...initialFilterState
        })

        setOpenFilters(prev => !prev);
    }

    return (
        <div className={`absolute z-50 w-full h-full md:h-auto ${!openFilters && 'hidden'}`}>
            <div className="flex flex-col justify-around bg-white p-6 rounded-lg shadow-lg h-full">
                <div className="relative flex justify-center items-center w-full md:hidden">
                    <IoMdArrowBack
                        className="absolute left-0 text-2xl text-principal-150"
                        onClick={() => setOpenFilters(prev => !prev)}
                    />
                    <p className="text-principal-50 font-bold text-lg">Filters</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <Filters filterType="Character" options={Object.values(CharacterFilter)} selectedFilter={localSelectedFilters.Character} onSelectFilter={(option) => setLocalSelectedFilters({ ...localSelectedFilters, Character: option })} />
                    <Filters filterType="Specie" options={Object.values(SpecieFilter)} selectedFilter={localSelectedFilters.Specie} onSelectFilter={(option) => setLocalSelectedFilters({ ...localSelectedFilters, Specie: option })} />
                    <Filters filterType="Gender" options={Object.values(GenderFilter)} selectedFilter={localSelectedFilters.Gender} onSelectFilter={(option) => setLocalSelectedFilters({ ...localSelectedFilters, Gender: option })} />
                    <Filters filterType="Character Status" options={Object.values(CharacterStatusFilter)} selectedFilter={localSelectedFilters.CharacterStatus} onSelectFilter={(option) => setLocalSelectedFilters({ ...localSelectedFilters, CharacterStatus: option })} />
                    <Filters filterType="Status" options={Object.values(StatusFilter)} selectedFilter={localSelectedFilters.Status} onSelectFilter={(option) => setLocalSelectedFilters({ ...localSelectedFilters, Status: option })} />
                </div>
                <div className="grid grid-cols-1 gap-3 pt-4 ">
                    <button
                        className={`
                            ${validationFilters ? 'bg-principal-300 text-white' : 'bg-principal-250'}
                            w-full rounded-md font-bold p-2
                        `}
                        onClick={() => applyFilters()}
                    >
                        Filter
                    </button>
                    <button
                        className="w-full bg-principal-250 rounded-md font-bold p-2"
                        onClick={() => onCleanFilters()}
                    >
                        Clean Filters
                    </button>
                </div>
            </div>
        </div >
    )
}
