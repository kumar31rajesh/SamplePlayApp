package models.datasource;

import java.util.Map;

import com.google.code.morphia.annotations.Entity;

@Entity(noClassnameStored = true)
public class DataSource {
	public String name;
	public String type;
	public String accountId;
	public String createUserId;
	public Map<String, String> configParameters;
	public long createTime;
	public long updateTime;
	public boolean markdelete;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public Map<String, String> getConfigParameters() {
		return configParameters;
	}

	public void setConfigParameters(Map<String, String> configParameters) {
		this.configParameters = configParameters;
	}

	public long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}

	public long getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(long updateTime) {
		this.updateTime = updateTime;
	}

	public boolean isMarkdelete() {
		return markdelete;
	}

	public void setMarkdelete(boolean markdelete) {
		this.markdelete = markdelete;
	}

}
