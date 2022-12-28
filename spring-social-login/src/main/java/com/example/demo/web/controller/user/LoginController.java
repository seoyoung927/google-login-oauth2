package com.example.demo.web.controller.user;

import com.example.demo.domain.user.User;
import com.example.demo.service.user.UserService;
import com.example.demo.web.dto.IdTokenRequestDto;
import com.google.common.net.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

import static com.example.demo.web.dto.UserDto.convertToDto;

@RestController
public class LoginController {

    @Autowired
    UserService userService;

    @PostMapping("v1/oauth2/login")
    public ResponseEntity LoginWithGoogleOauth2(@RequestBody IdTokenRequestDto requestBody, HttpServletResponse response) {
        String authToken = userService.loginOAuthGoogle(requestBody);
        final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken)
                .httpOnly(true)
                .maxAge(7 * 24 * 3600)
                .path("/")
                .secure(false)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }

    @GetMapping("v1/oauth2/logout")
    public ResponseEntity LoginWithGoogleOauth2(Principal principal, HttpServletResponse response) {
        User user = null;
        String authToken = "";
        if(principal!=null){
            user = userService.getUser(Long.valueOf(principal.getName()));
            authToken = userService.logoutOAuthGoogle(user);
        }
        final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken)
                .httpOnly(true)
                .maxAge(1 * 1 * 0)
                .path("/")
                .secure(false)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }
}

