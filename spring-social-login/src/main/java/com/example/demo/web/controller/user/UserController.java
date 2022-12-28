package com.example.demo.web.controller.user;

import com.example.demo.domain.user.User;
import com.example.demo.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

import static com.example.demo.web.dto.UserDto.convertToDto;


@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("v1/oauth2/user/info")
    public ResponseEntity getUserInfo(Principal principal) {
        if(principal!=null){
            User user = userService.getUser(Long.valueOf(principal.getName()));
            return ResponseEntity.ok().body(convertToDto(user));
        }else{
            return ResponseEntity.ok().body(convertToDto(new User()));
        }
    }
}