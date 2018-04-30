package com.example.logomania.Entity;

public class Phrase {

    private int id;
    private String situation;
    private String audio;

    public Phrase(int id, String feedback, String audio) {
        this.id = id;
        this.situation = feedback;
        this.audio = audio;
    }

    public int getId() {
        return id;
    }

    public String getFeedback() {
        return situation;
    }

    public String getAudio() {
        return audio;
    }
}
