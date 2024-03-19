// JobCard.js

const JobCard = ({ title, description, postedon, salary, country, color }) => {
    // Convert postedon to a Date object
    const postedonDate = new Date(postedon);

    // Options for date formatting (MM/DD/YYYY)
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    // Format the date as MM/DD/YYYY
    const formattedDate = postedonDate.toLocaleDateString(undefined, options);

    return (
        <div className="flex justify-center mt-36 ms-36 border-2 solid border-gray-400 w-80 h-96 rounded-xl relative cursor-pointer overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white">
            <div className=" rounded-xl h-64 w-72 ms-4 mt-2 absolute top-0 left-0 z-10" style={{backgroundColor:color}}>
                <div className="rounded-xl bg-white p-2 shadow-md absolute top-4 left-6">
                    <p className="text-sm font-semibold">{formattedDate}</p>
                </div>
                <p className="mt-16 ms-3 text-lg font-medium">{title}</p>
                <p className="ms-3 flex flex-wrap text-3xl font-semibold">{description}</p>
                <ul className="flex flex-wrap text-xs space-x-4 ms-3 mt-7">
                    <li className="border border-gray-500 rounded-md px-4 py-1">Internship</li>
                    <li className="border border-gray-500 rounded-md px-4 py-1">Full time</li>
                </ul>
            </div>
            <div className="mt-72 flex justify-between space-x-24">
                <div>
                    <p className="text-black text-xl font-medium">${salary}</p>
                    <p className="mt-4 text-2xl font-semibold text-black">{country}</p>
                </div>
                <div>
                    <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out">
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
