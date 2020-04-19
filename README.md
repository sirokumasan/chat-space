# README

## messagesテーブル

|column|type|options|
|------|----|-------|
|body|text|null: false|
|image|string|
|group_id|integer|null: false, forgin_key: true|
|user_id|integer|null: false, forgin_key: true|

### Association
- belongs_to :user
- belongs_to :group



## goupsテーブル
|column|type|options|
|------|----|-------|
|name|string|null: false, index: true|

### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages



## usersテーブル
|column|type|options|
|------|----|-------|
|nickname|string|null: false, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :groups, througt: :groups_users
- has_many :messages



## goups_usersテーブル
|column|type|options|
|------|----|-------|
|user_id|intege|null: false, forgin_key: true|
|group_id|integer|null: false, forgin_key: true|

### Association
- belongs_to :group
- belongs_to :user