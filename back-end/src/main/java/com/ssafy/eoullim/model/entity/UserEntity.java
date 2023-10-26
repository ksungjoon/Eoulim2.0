package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 20)
    private String username;

    @Column(nullable = false, length = 20)
    private String password;

    @Column(nullable = false, length = 4)
    private String name;

    @Column(nullable = false, length = 13)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;

    public static UserEntity of(String name, String phoneNumber, String username, String password) {
        return new UserEntity(
                null,
                name,
                phoneNumber,
                username,
                password,
                UserRole.USER
        );
    }

    public static UserEntity of(User user) {
        return new UserEntity(
                user.getId(),
                user.getName(),
                user.getPhoneNumber(),
                user.getUsername(),
                user.getPassword(),
                user.getRole()
        );
    }
}
