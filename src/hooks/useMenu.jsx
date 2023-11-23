import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState([]);
    const axiosPublic = useAxiosPublic()

    const { refetch, data: menu = [], isLoading: loading } = useQuery({
        queryKey: ["menu"],
        queryFn: async () => {
            const res = await axiosPublic.get("/menu");
            return res.data;
        }
    })

    // useEffect(() => {
    //     fetch('https://foodgoodzilla-server.vercel.app/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         })
    // }, [])

    return [menu, loading, refetch]
}

export default useMenu;