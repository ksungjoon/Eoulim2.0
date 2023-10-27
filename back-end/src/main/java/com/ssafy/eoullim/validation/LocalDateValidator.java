package com.ssafy.eoullim.validation;

import com.ssafy.eoullim.validation.ValidLocalDate;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDateValidator implements ConstraintValidator<ValidLocalDate, String> {
    @Override
    public void initialize(ValidLocalDate constraintAnnotation) {
        // 초기화 작업, 필요하다면 추가 설정
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // Null 값은 유효한 것으로 처리
        }

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate localDate = LocalDate.parse(value, formatter);
            return true; // 유효한 LocalDate 형식
        } catch (Exception e) {
            return false; // LocalDate 형식에 맞지 않음
        }
    }
}
