package com.example.logomania.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


@Component
public class WordRepository implements DataRepository {


    @Autowired
    private DataSource dataSource;

    public List<String> getAllWordsforOneSound(char sound){

        List<String> allWords = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT Word FROM dbo.Words WHERE Category = '" + sound + "';")) {
            while (rs.next()) {
                allWords.add(rs.getString("Word"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return allWords;

    }




}
