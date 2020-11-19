# Raider Legacy

![header-banner](https://raw.githubusercontent.com/SugarF0x/raider/master/git/header-banner.jpg)

A passion-replica of _Dungeon Raid_ - an old and no longer updated smartphone game.

The source code is being distributed under **MIT license** - feel free to fork and modify any files.
Any pull requests are more than welcome, just please follow commit syntax stated at the bottom of this **README**.

## Specification

This project uses `Nuxt.js` as its main framework. `Konva.js` with its native `Vue` support manages canvas.
The application is responsive and will adjust to every screen type at a ratio of 9:16.
The application can be interacted with on PC as well as on any smartphone.

## Current state of things

Here is a snapshot of what the current build looks like.
You can fiddle around with it yourself [here](http://raid.sugarfox.ru).

![snapshot-1](https://raw.githubusercontent.com/SugarF0x/raider/master/git/snapshot-1.jpg)
![snapshot-2](https://raw.githubusercontent.com/SugarF0x/raider/master/git/snapshot-2.jpg)

## Roadmap

This is my current roadmap of things to do that's **not** in any strict order.
Given my lack of experience if this field, every point here is subject to change.

###  Goal for v0.1.0:

- [X] Setup canvas
    - [X] Add responsive resize
- [X] Setup dungeon field
    - [X] Add tiles render
    - [X] Add tile differentiation
    - [X] Add tiles' arrow selection
        - [X] Add backtracking
        - [X] Add type check
            - [X] Let same types match
            - [X] Let skulls match with swords
        - [X] Add proximity check
    - [X] Add tiles' collection
        - [X] Delete tiles on collection
        - [X] Generate new tiles
            - [X] Generate tiles ontop the old ones
            - [X] Shift old ones down
        - [X] Add functionality to tiles' collection
            - [X] Handle coin collection
            - [X] Handle potion collection
            - [X] Handle sword collection
            - [X] Handle skull collection
            - [X] Handle shield collection
- [ ] (?) Setup header field
- [ ] (?) Setup footer field
- [ ] Setup skills field
- [ ] Setup menus field
- [X] Setup status field
    - [X] Setup coin display
    - [X] Setup health display
    - [X] Setup power display
        - [X] Setup current weapon power display
        - [X] Setup current armor display
        - [X] Setup current enemy power display
    - [X] Setup level progression display
    - [X] Setup upgrade progression display
- [ ] Setup baseline gameplay necessities
    - [ ] Add shop handling
    - [ ] Add upgrade handling
    - [ ] Add levelup handling
    - [ ] Add difficulty progression
    - [ ] Add skull state handling

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Commit syntax 

Commit syntax is subjective. Committer is to pick most appropriate commit category themselves.

* :blue_book: Documentation - General documentation changes, in both .md and JsDoc
* :x: Deletion - Removal or deletion of obsolete, redundant or deprecated code
* :white_check_mark: Feature - A new functional feature for end-user
* :hammer_and_wrench: Fix - A bugfix of any kind
* :corn: Miscellaneous - Uncategorized changes
* :recycle: Refactor - Under the hood code changes - nothing new for end-user
* :milky_way: Release - End of dev cycle
* :art: Style - Style changes, no new functionality
* :pill: Testing - Completion and maintenance of test units
* :construction: WIP - A stepping stone for a Work in Progress change

