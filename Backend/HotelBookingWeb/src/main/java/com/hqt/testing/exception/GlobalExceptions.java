package com.hqt.testing.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptions {

    //handler user exception
//    @ExceptionHandler(UserException.class)
//    public ResponseEntity<ErrorDetails> UserExceptionHandler(UserException userException, WebRequest req){
//
//        ErrorDetails errorDetails = new ErrorDetails(
//                userException.getMessage(),
//                req.getDescription(false),
//                LocalDateTime.now());
//        return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
//    }

    //handler other exception

    @ExceptionHandler(InvalidBookingRequestException.class)
    public ResponseEntity<ErrorDetails> InvalidBookingRequestException(InvalidBookingRequestException e, WebRequest req){

        ErrorDetails errorDetails = new ErrorDetails(
                e.getMessage(),
                req.getDescription(false),
                LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
    }

//    //handler not valid exception
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<ErrorDetails> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException me, WebRequest req){
//
//        ErrorDetails errorDetails = new ErrorDetails(
//                me.getBindingResult().getFieldError().getDefaultMessage(),
//                "Validation error",
//                LocalDateTime.now());
//        return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
//    }
}
