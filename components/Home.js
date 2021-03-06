import React, { useEffect } from "react"
import { useRouter } from "next/router"
import Pagination from "react-js-pagination"

import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { clearErrors } from "../redux/actions/roomActions"
import RoomItem from "./room/RoomItem"
import Link from "next/link"

const Home = () => {
    const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } =
        useSelector((state) => state.allRooms)

    const dispatch = useDispatch()

    const router = useRouter()

    let { page = 1, location } = router.query
    page = Number(page)

    useEffect(() => {
        toast.error(error)
        dispatch(clearErrors)
    }, [dispatch, error])

    const handlePagination = (pageNumber) => {
        router.push(`/?page=${pageNumber}`)
    }

    let count = roomsCount

    if (location) {
        count = filteredRoomsCount
    }

    return (
        <>
            <section id="rooms" className="container mt-5">
                <h2 className="mb-3 ml-2 stays-heading">
                    {location ? `Rooms in ${location}` : "All rooms."}
                </h2>

                <Link href="/search" className="ml-2 back-to-search">
                    <a className="ml-2 back-to-search">
                        <i className="fa fa-arrow-left"></i> Back to Search
                    </a>
                </Link>
                <div className="row">
                    {rooms && rooms.length === 0 ? (
                        <div className="alert alert-danger mt-5 w-100">
                            <b>No Rooms.</b>
                        </div>
                    ) : (
                        rooms &&
                        rooms.map((room, index) => (
                            <RoomItem key={index} room={room} />
                        ))
                    )}
                </div>
            </section>

            {resPerPage < count && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={count}
                        onChange={handlePagination}
                        nextPageText={"Next"}
                        prevPageText={"Prev"}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            )}
        </>
    )
}

export default Home
