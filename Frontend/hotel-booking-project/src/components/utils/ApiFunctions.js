/* eslint-disable no-unused-vars */
import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1"
})
export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}
export const getHeaderWithImage = () => {
        const token = localStorage.getItem("token")
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }
    /* This function adds a new room room to the database */
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData, {
        headers: getHeaderWithImage()
    })
    if (response.status === 201) {
        return true
    } else {
        return false
    }
}

/* This function get all room types from the database */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types", {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }

}
/* This function gets all room from database */
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        throw new Error("Error fetching rooms")

    }
}
/*This function delete room */
export async function deleteRoom(roomId) {
    try {
        const response = await api.delete(`/rooms/delete-room/${roomId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (err) {
        throw new Error(`Error deleting room ${err.message}`)
    }
}
/* This function update a room */
export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update-room/${roomId}`, formData, {
        headers: getHeaderWithImage()
    })
    return response
}

/** this function get a room by aid */
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (err) {
        throw new Error(`Error fetching room  ${err.message}`)
    }
}
/**This function save a new booking to the dtb */
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}`, booking)
        return response.data
    } catch (err) {
        if (err.response && err.response.data) {

            throw new Error(err.response.data)
        } else {
            throw new Error(`Error booking room: ${err.message}`)
        }
    }
}
/**this function fetching all bookings from database
 */
export async function getAllBookings() {
    try {
        const result = await api.get(`/bookings/all-bookings`, {
            headers: getHeader()
        })
        return result.data
    } catch (err) {
        throw new Error(`Error fetching  bookings : ${err.message}`)
    }
}

/**This function is get booking by confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (err) {
        if (err.response && err.response.data) {

            throw new Error(err.response.data)
        } else {
            throw new Error(`Error find booking: ${err.message}`)
        }

    }
}
/**This function cancel booking */
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/delete/${bookingId}`, {
            headers: getHeader()
        })
        return result.data
    } catch (err) {
        throw new Error(`Error canceling booking : ${err.message}`)
    }
}
/**This function get all available rooms*/
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return result
}

export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register", registration)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            new Error(`Error registration error: ${error.message}`)
        }
    }
}

export async function loginUser(login) {

    try {
        const response = await api.post("/auth/login", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }

}

/*  This is function to get the user profile */
export async function getUserProfile(email, token) {
    try {
        const response = await api.get(`users/${email}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error.message
    }
}


/* This isthe function to delete a user */
export async function deleteUser(email) {
    try {
        const response = await api.delete(`/users/delete/${email}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

/* This is the function to get a single user */
export async function getUser(email, token) {
    try {
        const response = await api.get(`/users/${email}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error.message
    }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserEmail(email, token) {
    try {
        const response = await api.get(`/bookings/user/${email}/bookings`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error.message)
        throw new Error("Failed to fetch bookings")
    }
}