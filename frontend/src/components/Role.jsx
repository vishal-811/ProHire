import { useState } from "react";

const RoleSelector =({onchange})=>{
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        setIsHovered(false); // Reset hover effect when input is focused
    };

    const handleBlur = () => {
        setIsFocused(false);
        setIsHovered(false); // Reset hover effect when input is blurred
    };
     return(
        <div className="text-sm font-medium text-left py-2">
           Role
           <select 
                id="role"
                name="role"
                onChange={onchange}
                className={`w-full px-2 py-1 border rounded border-slate-200 
                            ${isFocused ? 'focus:border-slate-500 focus:ring focus:ring-slate-300' : 'focus:border-blue-500 focus:ring focus:ring-blue-300'}
                            transition-all duration-300
                           `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ 
                    transition: 'box-shadow 0.4s ease',
                    boxShadow: isHovered ? '0 0 0 1px rgba(59, 130, 246, 0.5), 0 0 0 3px rgba(59, 130, 246, 0.3)' : 'none',
                }}
            >
                <option value="Job Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
            </select>
    </div>
        
     )
}

export default RoleSelector;