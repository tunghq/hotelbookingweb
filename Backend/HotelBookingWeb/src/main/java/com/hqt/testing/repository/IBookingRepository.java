package com.hqt.testing.repository;

import com.hqt.testing.modal.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IBookingRepository extends JpaRepository<BookedRoom, Integer> {

    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);
    List<BookedRoom> findByRoomId(int roomId);

    List<BookedRoom> findByGuestEmail(String email);
}
