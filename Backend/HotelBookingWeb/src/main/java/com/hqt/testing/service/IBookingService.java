package com.hqt.testing.service;

import com.hqt.testing.modal.BookedRoom;

import java.util.List;

public interface IBookingService {
    public List<BookedRoom> getAllBookingsByRoomId(int roomId);

    void cancelBooking(int bookingId);

    String saveBooking(int roomId, BookedRoom bookingRequest);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();



    List<BookedRoom> getBookingsByUserEmail(String email);
}
