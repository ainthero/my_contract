// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    struct Data {
        uint256 number;
        string text;
        bool flag;
    }

    mapping(address => Data) public dataMap;

    event DataAdded(address indexed key, Data data);
    event DataRemoved(address indexed key);

    function addData(address key, uint256 number, string memory text, bool flag) public {
        Data memory newData = Data(number, text, flag);
        dataMap[key] = newData;

        emit DataAdded(key, newData);
    }

    function removeData(address key) public {
        delete dataMap[key];

        emit DataRemoved(key);
    }
}
