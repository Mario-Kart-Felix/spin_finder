require "open-uri"
require  'json'

puts "--- GAME  START ---"
puts "---"
puts "---"
puts "cleaning house :)"
User.destroy_all
Bike.destroy_all
Booking.destroy_all
Favourite.destroy_all
Review.destroy_all
# # Kills all Active storage items ##
ActiveStorage::Attachment.all.each { |attachment| attachment.purge }

puts "done cleaning house.."

# api_var = ENV["WEIRD_AI_SHIT"]

puts "-- Making Humans"
## kill all images in all models ##

## User Master OverLoad # HOLD GME !! ##
1.times do

  file = File.open("./db/avatars/00.jpeg")

  make_me = User.create!(
    first_name: "Deep Fucking",
    last_name: "Value",
    bio: "$GME goes BRRRRRRRR 💎🙌",
    location: "Melbourne",
    email: "john@gmail.com",
    admin: true,
    password: "123456"
  )
  make_me.avatar.attach(io: file, filename: "#{make_me.first_name}.jpeg", content_type: 'image/jpeg')
  puts "made #{make_me.first_name} #{make_me.last_name}"

end

## Make the Plebs ##
count = 0

11.times do

  file = File.open("./db/avatars/#{count}.jpeg")

  ## make the instance
  make_me = User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    bio: Faker::TvShows::Buffy.quote,
    location: ["Perth", "Melbourne", "Sydney", "Darwin", "Brisbane", "Byron Bay"].sample,
    email: Faker::Internet.email,
    password: Faker::Name.name_with_middle
  )
  make_me.avatar.attach(io: file, filename: "#{make_me.first_name}.png", content_type: 'image/jpg')
  #
  puts "made #{make_me.first_name} #{make_me.last_name}"
  count += 1

end
puts "--- Making Humans Ended !"

puts "--- Making Bikes Bro !!"
### Make some Bikes ###
count = 0

5.times do
  find_image = Dir.children("./db/bikes/")
  ## make the instance

  make_me = Bike.create!(
    price: rand(3..15),
    name: Faker::Cannabis.strain,
    available: [true, false].sample,
    description: Faker::Movies::HitchhikersGuideToTheGalaxy.marvin_quote,
    location: ["Perth", "Melbourne", "Sydney", "Darwin", "Brisbane", "Byron Bay"].sample,
    rating: rand(2..5),
    user_id: User.pluck(:id).sample
  )

  find_image.select{ |i| i[/#{count}/] }.each do |image|
    file = File.open("./db/bikes/#{image}")
    make_me.images.attach(io: file, filename: "#{image.split(".")[0]}.jpeg", content_type: 'image/jpeg')
  end

  puts "made #{make_me.name}"
  count += 1
end

puts "--- Making Bikes Ended !"
#   ### Make some Bookings ###


puts "-- Making Bookings !"
# Day.where(:reference_date => 3.months.ago..Time.now).count
#=> 721
10.times do

  ## make the instance
  # TODO:
  # owner => me.bike.user.id != user_id

  make_me = Booking.create!(
    total_price: rand(25..85), ## TODO:: work out total price
    from: Time.now + (rand(10..20) * rand(30000..40000 )),
    till: Time.now + (rand(30..40) * rand(70000..90000 )),
    user_id: User.pluck(:id).sample,
    bike_id: Bike.pluck(:id).sample
  )

  puts "made Booking # #{make_me.id}"

end
puts "--- Making Bookings ENDED !"

puts "--- Making Reviews Start !"

10.times do

  ## make the instance
  make_me = Review.create!(
    content: Faker::TvShows::GameOfThrones.quote,
    rating: rand(1..5),
    booking_id: Booking.pluck(:id).sample
  )
  puts "made Review # #{make_me.id}"

end

puts "--- Making Reviews ENDED !"

puts "--- Making Favourites Start !"

count_fav = 0
until count_fav == 10 do
    make_me = Favourite.new(
      bike_id: Bike.pluck(:id).sample,
      user_id: User.pluck(:id).sample
    )
    if make_me.valid?
      make_me.save!
      count_fav += 1
      puts "made Favourite # #{make_me.id}"
    else
      puts "didn't work out ..."
    end
  end

  puts "--- Making Reviews ENDED !"
  puts "---"
  puts "---"
  puts "--- GAME OVER ---"
