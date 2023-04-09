import json
import random

def load_json(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
    return data

def select_random_games(games_list, num_games=10):
    if len(games_list) < num_games:
        raise ValueError("reeee")
    return random.sample(games_list, num_games)

def main():
    file_path = "games.json"
    games_list = load_json(file_path)
    random_games = select_random_games(games_list)
    print("10 Random Games:")
    for game in random_games:
        print(game)

if __name__ == "__main__":
    main()