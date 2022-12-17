pragma solidity ^0.5.0;

contract Decentragram {
  // Code goes here...
  string public name = "Decentragram";

  uint public imageCount = 0;
  mapping(uint => Image) public images;

  struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }

  event ImageCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );

  event ImageTipped(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );

  // upload image

  function uploadImage(string memory _imgHash,string memory _description) public{

    require(bytes(_imgHash).length > 0); // Make sure the image hash exists
    require(bytes(_description).length > 0); // Make sure the image description exists
    require(msg.sender != address(0x0)); // Make sure the uploader address exists



    // increment image id
    imageCount++;

    // add image to contract
    images[imageCount] = Image(imageCount,_imgHash, _description, 0, msg.sender);

    // Trigger an event
    emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);

  }

  // tip image owner
  function tipImageOwner(uint _id) public payable{

    require(_id > 0 && _id <= imageCount); // Make sure the id is valid

    Image memory _image = images[_id]; // Fetch the image
    address payable _author = _image.author; // Fetch the author
    address(_author).transfer(msg.value); // Pay the author by sending them Ether
    _image.tipAmount = _image.tipAmount + msg.value; // Increment the tip amount
    images[_id] = _image; // Update the image

    emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);
  }


}