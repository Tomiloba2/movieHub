import { useNavigate } from 'react-router-dom';
import {ViewCarousel} from '@mui/icons-material'

export interface IButtonProps {
id?:number
}

export function Button(props: IButtonProps) {
    const navigate=useNavigate()
    return (
        <div>
            <button onClick={()=>navigate(`/details/${props.id}`)} style={{
                display:`flex`,
                justifyContent:`center`,
                gap:`2%`
            }}>
                <i>
                    <ViewCarousel/>
                </i>
                <p>View Details</p>
            </button>
        </div>
    );
}
