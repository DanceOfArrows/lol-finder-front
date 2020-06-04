# LoL Finder
LoL Finder allows users to find profile data of players in the popular MOBA game "League of Legends".  
The data can normally be found within the client's search function, but is inaccessible while in-game or not 
on a desktop.  This goal of this app is to alleviates this issue and to also display player data in an 
easy to read manner.  Champions refer to the playable characters in the game.

Feature List:  
* Displays the current free champion rotation on the home page
* Search for player profile which returns:
  * Champion Mastery
  * Current rank
  * Match history
* Use of back end to hide API key and to filter return data

List of Riot API's used:  
* Champion
* Champion Mastery v4
* League v4
* Match v4
* Summoner v4

BackEnd Routes
1. Info
   * `/info`
     * Get requested player's rank, match-history, and relevant account info
2. Match
   * `/match`
     * Get specific match info
3. Champion
   * `/rotation`
     * Get current free champion rotation


FrontEnd Routes  
1. Home Page (`/`)
2. Rotation Page (`/rotation`) - Current free champion rotation
3. Summoner Page (`/summoner/:summonerName`) - Player info, match history, and player's champion mastery
