interface FiltersProps {
    filterType: string;
    options: string[];
    selectedFilter: string | null;
    onSelectFilter: (option: string | null) => void;
}

const Filters = ({ filterType, options, onSelectFilter, selectedFilter }: FiltersProps) => {

    return (
        <div>
            <span className="">{filterType}</span>
            <div className="grid grid-cols-3 gap-3 py-2">
                {options.map(option => (
                    <button
                        key={option}
                        className={`
                            ${selectedFilter === option && 'bg-principal-100 text-principal-300'}   
                            rounded-md text-principal-50 truncate font-bold border p-2
                            transition ease-in duration-100 hover:border hover:border-principal-150 
                        `}
                        onClick={() => onSelectFilter(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filters;
