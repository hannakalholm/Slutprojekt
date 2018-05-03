package com.example.logomania.Repository;

import com.example.logomania.Entity.Phrase;
import com.example.logomania.Entity.Word;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Component
public class WordPhraseRepository implements DataRepository {

    @Autowired
    private DataSource dataSource;

    //One game contains of five randomly choosen words.
    private final int GAME_SET = 5;


    public List<Word> getAllWordsForOnePhoneme(String phoneme) {

        List<Word> allWordsForOnePhoneme = new ArrayList<>();
        String statement = "SELECT * FROM Words WHERE Phoneme = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement sth = conn.prepareStatement(statement);) {

            sth.setString(1, phoneme);
            ResultSet rs = sth.executeQuery();
            while (rs.next()) {

                allWordsForOnePhoneme.add(new Word(rs.getInt("ID")
                        , rs.getString("Name")
                        , rs.getString("Image")
                        , rs.getString("Audio")
                        , rs.getString("Phoneme")
                        , rs.getString("Position")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
        return allWordsForOnePhoneme;
    }


    public List<Word> generateRandomFiveWords(List<Word> allWordsForOnePhoneme) {
        List<Word> randomFiveWords = new ArrayList<>();
        Collections.shuffle(allWordsForOnePhoneme);
        for (int i = 0; i < GAME_SET; i++) {
            randomFiveWords.add(allWordsForOnePhoneme.get(i));
        }
        return randomFiveWords;
    }

    public List<Phrase> generatePhrasesWhenCorrect(){
        List<Phrase> allPhrasesWhenCorrect = new ArrayList<>();
        String statement = "SELECT * FROM Phrases WHERE Situation = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement sth = conn.prepareStatement(statement);) {

            sth.setString(1, "Correct");
            ResultSet rs = sth.executeQuery();
            while (rs.next()) {
                allPhrasesWhenCorrect.add(new Phrase(rs.getInt("ID")
                        , rs.getString("Situation")
                        , rs.getString("Audio")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return allPhrasesWhenCorrect;
    }

    public List<Phrase> generatePhrasesWhenIncorrect(){
        List<Phrase> allPhrasesWhenIncorrect = new ArrayList<>();
        String statement = "SELECT * FROM Phrases WHERE Situation = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement sth = conn.prepareStatement(statement);) {

            sth.setString(1, "Incorrect");
            ResultSet rs = sth.executeQuery();
            while (rs.next()) {
                allPhrasesWhenIncorrect.add(new Phrase(rs.getInt("ID")
                        , rs.getString("Situation")
                        , rs.getString("Audio")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return allPhrasesWhenIncorrect;

    }

}
